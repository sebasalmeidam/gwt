class StudentsController < ApplicationController

  def validate_students
    @users = params[:users]
    @current_students = Student.where(torre_username: @users ).map(&:torre_username)
    @students = @users - @current_students

    @new_students = @students.map{|user| {torre_username: user, created_at: DateTime.now, updated_at: DateTime.now}}
    unless @new_students.empty?
      Student.insert_all(@new_students)      
    end
    
    render json: {status: 200, mensaje: 'Received'} and return
  end
end